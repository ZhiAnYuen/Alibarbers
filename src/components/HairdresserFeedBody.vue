<template>
	<p class="text-start ms-5 mt-5 fw-semibold">Hello {{ name }},</p>
	<h1 class="text-start ms-5 fw-semibold">Welcome to your Insights Dashboard.</h1>
	<p class="text-center">{{ email }}</p>


</template>


<script>
	import db from "../firebase.js";
  import { useUserStore } from "../stores/users.js";
  import { computed } from "vue";
	import { collection, query, where, getDocs } from "firebase/firestore";
  
  export default {
    name: "HairdresserFeedBody",
    setup() {
      const user = useUserStore();
      return {
        name: computed(() => user.name),
        email: computed(() => user.email),
        isLoggedIn: computed(() => user.isLoggedIn),
        userType: computed(() => user.userType),
      };
    },
		mounted() {
			var shopsRef = collection(db.db, "shop");
			var q = query(shopsRef, where("ownerEmail", "==", this.email));
			var querySnapshot = getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
		},
  };
</script>