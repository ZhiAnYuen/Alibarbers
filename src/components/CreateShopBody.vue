<template>
  	<h1 class="text-center p-5">Welcome! Set up your shop here.</h1>
	<div class="container">
		<br/>
		<form>
			<!-- Shop name input and verification -->
			<div class="row">
				<label for="shopname" class="form-label">Shop Name</label>
			</div>
			<div class="row">
				<div class="mb-3 col-lg-3">
					<input type="text" class="form-control" id="shopname" v-model="shopname" placeholder="E.g. Sally's Hairdressers">
				</div>
				<div class="mb-3 col-lg-9">
					<span>
						<button v-if="shopnameAvail==1" type="button" class="btn custom" @click="checkAvail()">
							Verify Shop Name
						</button>
						<span v-if="shopnameAvail==2" class="form-text">
							<button type="button" class="btn custom" @click="checkAvail()">Verify Shop Name</button>
							This shop name has been taken. Please choose another name.
						</span>
						<div v-if="shopnameAvail==3" class="form-text">Shop Name Verified!</div>
					</span>
				</div>
			</div>
			
			<!-- Shop location. Need to add API here? -->
			<div class="row">
				<label for="shoplocation" class="form-label">Shop Location</label>
			</div>
			<div class="row">
				<div class="mb-3 col-lg-6">
					<input type="text" class="form-control" id="shoplocation" v-model="shoplocation" placeholder="E.g. 6 Thompson Rd, Singapore 366481">
				</div>
			</div>

			<!-- Add & remove available services -->
			<div class="row">
				<div class="col-lg-12">Add One or More Services</div>
			</div>
			<div class="form-group row" v-for="(service, index) in services">
				<div class="col-md-6">
					<input type="text" :name="'service[' + index + '][name]'" class="form-control" placeholder="E.g. Hair Cut & Dry">
				</div>
				<div class="col-md-3">
					<input type="number" :name="'service[' + index + '][price]'" class="form-control" placeholder="Price">
				</div>
				<div class="col-md-3">
					<button type="button" @click="removeService(index)" class="btn btn-danger">
						Remove
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3">
					<button type="button" @click="addService()" class="btn custom">Add Service</button>
				</div>
          	</div>

			<div class="row">
				<div class="col-lg-3">
					<br/>
					<button type="reset" class="btn btn-danger">Reset Fields</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
    </div>
</template>

<script>
import db from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const shop = collection(db.db, "shop");
const auth = getAuth();
const user = auth.currentUser;
console.log(user); // not sure why the user is not recorded, this logs null

export default {
	name: "CreateShop",
	created () {
		this.addService();
	},
	data () {
		return {
			shopname: "",
			/* ownername: user.name,
			owneremail: user.email, */
			shoplocation: "",
			services: [],
			shopnameAvail: 1,
		};
	},
	methods: {
		checkAvail () {
			let check = 0;
			check = query(shop, where("shopName", "==", this.shopname));
			console.log(check);
			if (check != 0) {
				this.shopnameAvail = 3;
			} else {
				this.shopnameAvail = 2;
			}
		},
	addService () {
		this.services.push({
			name: "",
			price: "",
		});
	},
	removeService(index) {
		if (this.services.length <= 1) {
			alert('You have to provide at least 1 hairdressing service!');
		}
		this.services.splice(index, 1);
	},
    createShop () {
	// create json format for services
		db.collection("shop")
			.add({
				location: this.shoplocation,
				shopName: this.shopname,
				ownerName: this.ownername,
				ownerEmail: this.owneremail,
				services: this.services,
			})
			.then(() => {
				alert("Success! Welcome, " + this.ownername);
			})
			.catch((error) => {
				console.error(error);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
h1 {
  background-color: $pastel-yellow;
}
button.custom {
	background-color: $pastel-yellow;
	color: black;
}
button {
	border: 0ch;
}
</style>
