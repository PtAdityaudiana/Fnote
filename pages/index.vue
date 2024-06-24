<template>
  <div class="container mx-auto h-screen bg-black">
    <div class="content">
      <h1 class="text-3xl font-bold underline">MIG-25: Foxbat</h1>
      <div class="flex justify-center">
        <div class="lg:w-[393px] relative">
          <img
            src="@/assets/image.jpg"
            alt="MIG-25 Foxbat"
            class="relative w-full h-auto"
          />
        </div>
      </div>
      <p class="text-base text-center">
        <span class="text-lg italic font-bold"> Pesawat MiG-25 </span> <br />
        Foxbat adalah pesawat tempur supersonik Soviet yang dikembangkan pada
        tahun 1960-an. Pesawat ini terkenal karena kecepatan dan ketinggiannya
        yang sangat tinggi, serta kemampuannya untuk melakukan misi pengintaian
        jarak jauh. MiG-25 dilengkapi dengan mesin kuat dan dapat mencapai
        kecepatan lebih dari Mach 3. Meskipun dirancang untuk kecepatan dan
        ketangguhan, Foxbat tidak begitu manuverabel dalam pertempuran udara
        langsung. Pesawat ini memiliki peran utama dalam angkatan udara Soviet
        dan digunakan oleh negara-negara lain di seluruh dunia.
      </p>
      <p class="mt-10 text-3xl italic font-bold text-center">by coem</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
};
</script>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}



.content {
  text-align: center;
  color: white;
  width: 100%;
}

h1 {
  color: white;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 40px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.image-description {
    color: white;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
  }


</style>
