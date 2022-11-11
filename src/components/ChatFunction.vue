<template>
  <div class="view chat">
    <header>
      <button class="back" @click="Back">Back</button>
      <h1>Saldresser</h1>
    </header>

    <section class="chat-box">
      <div class="message current-user"> 
        <!--need to check here if user is sent by cust or hairdresser-->
        <div class="message-inner">
          <div class="username">{{ this.name }}</div>
          <div class="content">{{ this.message }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input type="text" v-model="message" placeholder="Write a message..." />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { computed } from "vue";
//import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";
import { ref, update, push, child } from "firebase/database";
import db2 from "../firebase.js";

export default {
  setup() {
    const user = useUserStore();
    return {
      name: computed(() => user.name),
      email: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
    };
  },

  data() {
    return {
      message: "",
      messageData: [],
      count: 0,
      
      
    };
  },

  methods: {
    SendMessage() {
      if (this.message === "" || this.message === null) {
        return;
      }

      const messageData = {
        username: this.name,
        hairdresser: "Saldresser",
        content: this.message,
      };

      // Get a key for a new Post.
      const newMessagesKey = push(child(ref(db2.db2), "messages")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/messages/" + newMessagesKey] = messageData;
      this.message = "";
      return update(ref(db2.db2), updates);
    },
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffd24c;

  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .back {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #333;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
            word-break: break-all;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;

          .message-inner {
            max-width: 75%;
            .content {
              color: #333;
              font-size: 18px;
              background-color: #ffd24c;
              word-break: break-all;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ffd24c;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
