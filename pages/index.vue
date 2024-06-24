<template>
  <div class="container black-background">
    <div class="content">
      <h1 class="text-3xl font-bold underline">MIG-25: Foxbat</h1>
      <div class="image-container">
        <img src="@/assets/image.jpg" alt="MIG-25 Foxbat" class="image"/>
      </div>
      <p class="image-description">The MiG-25 Foxbat is a Soviet supersonic interceptor aircraft that was developed in the 1960s. It is famous for its very high speed and altitude capabilities, as well as its ability to conduct long-range reconnaissance missions. The MiG-25 is equipped with powerful engines and can reach speeds over Mach 3. Although designed for speed and toughness, the Foxbat is not very maneuverable in direct air combat. This aircraft played a major role in the Soviet air force and has been used by other countries around the world.</p>
      <p class="image-description">by coem</p>
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
  background-color: black; /* Ensure the background covers the whole page */
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: black;
  flex-direction: column;
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

.image {
  width: 400px;
  height: 300px;
  max-width: 100%;
  max-height: 500px;
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
