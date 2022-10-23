<template>
  <div class="row mt-3 justify-content-center">
    <div v-for="feed in feeds" :key="feed.id" class="col-2">
      <CardBox
        :imgLink="feed.imgLink"
        :name="feed.name"
        :rating="feed.rating"
      />
    </div>
  </div>
</template>

<script>
import CardBox from "./CardBox.vue";

export default {
  name: "FeedBox",
  components: {
    CardBox,
  },
  data() {
    return {
      feeds: [
        {
          imgLink:
            "https://fullhousesalon.com.sg/wp-content/uploads/2020/05/logo_dark-1.png",
          name: "Full House Salon",
          rating: "5.0 (50)",
        },
        {
          imgLink:
            "https://bonbon.com.sg/wp-content/uploads/2021/09/cropped-Untitled-design-2.png",
          name: "Bonbon Blowout Bar+",
          rating: "4.5 (40)",
        },
        {
          imgLink:
            "https://static.wixstatic.com/media/4801f1_21814ff05da8430ca2981930a4953b3f~mv2.webp",
          name: "Salon de Edmund",
          rating: "4.0 (30)",
        },
        {
          imgLink:
            "https://cdn.shopify.com/s/files/1/0467/2556/2531/files/wos_logo_home_180x.jpg?v=1614319680",
          name: "Walking On Sunshine",
          rating: "5.0 (50)",
        },
        {
          imgLink: "https://www.art-noise.sg/images/bn_ikebukuro.jpg",
          name: "Art-Noise",
          rating: "5.0 (50)",
        },
      ],
    };
  },
};
</script>
