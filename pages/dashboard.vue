<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <button
        @click="logout"
        class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >Log out</button>
    </div>

    <div v-if="showForm">
      <form @submit.prevent="handleSubmit" class="mb-8">
        <div class="mb-4">
          <input
            v-model="title"
            class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Title"
          />
        </div>
        <div class="mb-4">
          <textarea
            v-model="content"
            class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Content"
          ></textarea>
        </div>
        <div class="mb-4">
          <select
            v-model="category"
            class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Basic">Basic</option>
            <option value="Important">Important</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >{{ editMode ? 'Update Note' : 'Add Note' }}</button>
        <button
          type="button"
          @click="cancelEdit"
          class="w-full py-2 mt-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >Cancel</button>
      </form>
    </div>

    <div v-else>
      <div class="mb-8">
        <input
          v-model="searchKeyword"
          @input="searchNotes"
          class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search notes by title"
        />
      </div>

      <div class="mb-8 flex space-x-4">
        <div class="flex-1">
          <label class="block mb-1">Filter by start date</label>
          <input
            type="date"
            v-model="startDate"
            @change="filterNotesByDate"
            class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="flex-1">
          <label class="block mb-1">Filter by end date</label>
          <input
            type="date"
            v-model="endDate"
            @change="filterNotesByDate"
            class="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <button
        @click="showForm = true"
        class="w-full py-2 mb-8 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
      >Add Note</button>

      <div v-if="notes.length">
        <h2 class="text-2xl font-bold mb-4">Notes</h2>
        <div v-for="note in notes" :key="note.id" class="mb-6 p-4 border border-gray-700 bg-gray-800 rounded-lg">
          <h3 class="text-xl font-bold mb-2">{{ note.title }}</h3>
          <p class="mb-2">{{ note.content }}</p>
          <p class="mb-2 text-sm text-gray-400">{{ note.category }}</p>
          <p class="mb-2 text-sm text-gray-400">Created at: {{ note.created_at.toDate().toLocaleString() }}</p>
          <div class="flex space-x-2">
            <button @click="removeNote(note.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300">Delete</button>
            <button @click="startEdit(note)" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, query, where, Timestamp, doc } from 'firebase/firestore'
import { db, auth } from '~/plugins/firebase'

const title = ref('')
const content = ref('')
const category = ref('Basic') 
const notes = ref([])
const searchKeyword = ref('')
const startDate = ref('')
const endDate = ref('')
const editMode = ref(false)
const currentNoteId = ref('')
const showForm = ref(false)

const router = useRouter()

const fetchNotes = async () => {
  const user = auth.currentUser
  if (!user) return

  const notesCollection = collection(db, 'notes')
  const q = query(notesCollection, where('user_id', '==', user.uid))
  const querySnapshot = await getDocs(q)
  
  
  notes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => {
      if (a.category === 'Important' && b.category !== 'Important') return -1;
      if (b.category === 'Important' && a.category !== 'Important') return 1;
      return 0;
    });
}

const handleSubmit = async () => {
  if (editMode.value) {
    await updateNote()
  } else {
    await createNote()
  }
}

const createNote = async () => {
  const user = auth.currentUser
  if (!user) return

  const note = {
    title: title.value,
    content: content.value,
    category: category.value,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
    user_id: user.uid,
    user_name: user.displayName || 'Anonymous', 
  }

  await addDoc(collection(db, 'notes'), note)
  await fetchNotes()
  clearForm()
}

const updateNote = async () => {
  if (!currentNoteId.value) return

  const noteRef = doc(db, 'notes', currentNoteId.value)
  await updateDoc(noteRef, {
    title: title.value,
    content: content.value,
    category: category.value,
    updated_at: Timestamp.now()
  })

  await fetchNotes()
  clearForm()
}

const removeNote = async (id: string) => {
  await deleteDoc(doc(db, 'notes', id))
  await fetchNotes()
}

const searchNotes = async () => {
  const user = auth.currentUser
  if (!user) return

  const notesCollection = collection(db, 'notes')
  const q = query(
    notesCollection,
    where('user_id', '==', user.uid),
    where('title', '==', searchKeyword.value)
  )
  const querySnapshot = await getDocs(q)
  notes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const filterNotesByDate = async () => {
  const user = auth.currentUser
  if (!user) return

  const notesCollection = collection(db, 'notes')
  let q = query(notesCollection, where('user_id', '==', user.uid))

  if (startDate.value && endDate.value) {
    const start = Timestamp.fromDate(new Date(startDate.value))
    const end = Timestamp.fromDate(new Date(endDate.value))

    q = query(
      notesCollection,
      where('user_id', '==', user.uid),
      where('created_at', '>=', start),
      where('created_at', '<=', end)
    )
  }

  const querySnapshot = await getDocs(q)
  notes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const startEdit = (note) => {
  title.value = note.title
  content.value = note.content
  category.value = note.category
  currentNoteId.value = note.id
  editMode.value = true
  showForm.value = true
}

const clearForm = () => {
  title.value = ''
  content.value = ''
  category.value = 'Basic' 
  currentNoteId.value = ''
  editMode.value = false
  showForm.value = false
}

const cancelEdit = () => {
  clearForm()
}

const logout = async () => {
  await auth.signOut()
  router.push('/').then(() => {
    window.location.reload()
  })
}

onMounted(async () => {
  
  const user = auth.currentUser
  if (user) {
    await fetchNotes()
  } else {
    
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchNotes()
      } else {
        router.push('/login')
      }
    })
  }
})
</script>

<style scoped>
body {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

input, textarea, select {
  color: #f5f5f5;
}

button {
  color: #f5f5f5;
}
</style>