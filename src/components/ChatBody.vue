<template>
  <div class="container-fluid px-lg-5 px-md-4 px-sm-4 px-4 py-5">
    <!-- CHAT CARD -->
    <div class="row justify-content-center">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div id="convoBodyMain">
                <div
                  v-for="(convo, index) of convos"
                  :key="index"
                  id="convoBody"
                  class="row mb-3 mx-3"
                  @click="readConvo(convo.displayName, convo.uid)"
                >
                  <div id="convoName">
                    <h5 class="text-dark">
                      {{ convo["displayName"] }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="card" class="card border rounded-4">
        <div class="row" style="height: 100%">
          <!-- CONVO BLOCK -->
          <div id="convoBlock" class="col-lg-12 col-xl-3">
            <!-- CONVO HEADER -->
            <div id="convoHeader" class="row mx-1">
              <h4 id="name" class="text-start text-dark">{{ name }}'s Chats</h4>
            </div>

            <!-- CONVO BODY -->
            <div id="convoBodyMain">
              <div
                v-for="(convo, index) of convos"
                :key="index"
                id="convoBody"
                class="row mb-3 mx-3"
                @click="readConvo(convo.displayName, convo.uid)"
              >
                <div id="convoName">
                  <h5 class="text-dark">
                    {{ convo["displayName"] }}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <!-- CHAT BLOCK -->
          <div id="chatBlock" class="col-lg-12 col-xl-9">
            <!-- CHAT HEADER -->
            <div class="row">
              <div id="chatInfo">
                <div class="row">
                  <h4 class="m-2 text-white col-lg-5 col-md-7">
                    <svg
                      id="convoListButton"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-list me-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>

                    {{ chatHeaderName }}
                  </h4>
                  <button
                    v-if="chatHeaderName != ''"
                    id="visitShopBtn"
                    class="col-lg-3 col-md-2 col-sm-6 col-xs-3 hover-button p-2 m-2"
                    style="border-color: white;"
                    @click="routeToShop"
                  >
                    Visit Shop
                  </button>
                  <button
                    v-if="chatHeaderName != ''"
                    id="visitShopBtn"
                    class="col-lg-3 col-md-2 col-sm-6 col-xs-3 hover-button p-2 m-2"
                    style="border-color: white;"
                    @click="routeToBooking"
                  >
                    Book Now
                  </button>

                </div>
              </div>
            </div>

            <!-- CHAT BODY -->
            <div id="chatBodyContainer" class="row">
              <div id="chatBody">
                <!-- CHAT MESSAGE -->
                <template v-for="message of messages" :key="message.index">
                  <div
                    v-if="message['uid'] == this.currentUID"
                    class="massagesList owner"
                  >
                    <div class="messageContent">
                      <p>
                        {{ message.text }}
                      </p>
                    </div>
                  </div>

                  <div v-else class="massagesList">
                    <div class="messageContent">
                      <p>
                        {{ message.text }}
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- CHAT INPUT -->
            <div id="chatInput" class="row">
              <div class="input-group mb-3">
                <input
                  v-model="inputText"
                  type="text"
                  class="form-control"
                  placeholder="Type something"
                />
                <button
                  class="btn btn-dark"
                  type="button"
                  id="sendButton"
                  @click="sendMsg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";

export default {
  name: "ChatBody",
  components: {},
  data() {
    const user = useUserStore();

    return {
      currentUID: user.userID,
      name: user.name,
      otherUID: "",
      convos: [],
      chatHeaderName: "",
      messages: [],
      inputText: "",
    };
  },
  async mounted() {
    // Get user's convo
    const docSnap = await getDoc(doc(db.db, "userChats", this.currentUID));

    // Create user's convo document if does not exists
    if (!docSnap.exists()) {
      await setDoc(doc(db.db, "userChats", this.currentUID), {});
    }

    // Keep look out on changes on user's convo document
    onSnapshot(doc(db.db, "userChats", this.currentUID), (doc) => {
      let entries = Object.entries(doc.data());
      for (let entry of entries) {
        this.convos.push(entry[1]);
      }
    });
  },
  methods: {
    // Retrieve conversation and display
    async readConvo(name, uid) {
      this.otherUID = uid;
      this.chatHeaderName = name;

      // Find conversation based on combined UID
      const combinedUID =
        this.currentUID > this.otherUID
          ? this.currentUID + this.otherUID
          : this.otherUID + this.currentUID;

      const docSnap = await getDoc(doc(db.db, "chats", combinedUID));

      // If user and other user conversation does not exist, start one.
      if (!docSnap.exists()) {
        await setDoc(doc(db.db, "chats", combinedUID), {
          messages: [],
        });
      }

      // Keep track of messages of this convo
      onSnapshot(doc(db.db, "chats", combinedUID), (doc) => {
        this.messages = doc.data()["messages"];
      });

      this.inputText = "";
    },
    // Send message
    async sendMsg() {
      if (this.otherUID == "") {
        return;
      }

      // Change message to send as object
      let obj = {
        text: this.inputText,
        uid: this.currentUID,
      };

      const combinedUID =
        this.currentUID > this.otherUID
          ? this.currentUID + this.otherUID
          : this.otherUID + this.currentUID;

      // Get current conversation
      const docSnap = await getDoc(doc(db.db, "chats", combinedUID));

      // Append message to send to conversation
      let curr = docSnap.data()["messages"];

      if (curr == null) {
        await setDoc(doc(db.db, "chats", combinedUID), {
          messages: [obj],
        });
      } else {
        curr.push(obj);

        // Update conversation
        await setDoc(doc(db.db, "chats", combinedUID), {
          messages: curr,
        });
      }
      this.inputText = "";
    },
    routeToShop() {
      this.$router.push({ path: "/shop/" + this.otherUID });
    },
    routeToBooking() {
      this.$router.push({ path: "/booking/" + this.otherUID });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  height: 100vh;
  border-radius: 15px;
  overflow: hidden;
}

#convoBlock {
  background-color: white;
  gap: 10px;
}

#convoHeader {
  background-color: white;
}

#name {
  padding: 20px;
}

#convoBodyMain {
  max-height: 80vh;
  overflow: auto;
}

@media (max-width: 1200px) {
  #convoBlock {
    display: none;
  }
}

@media (min-width: 1200px) {
  #convoListButton {
    display: none;
  }
}

#convoBody {
  padding: 20px;
  text-align: left;
  border-radius: 15px;
  background-color: #f4f4f7;
  cursor: pointer;

  &:hover {
    background-color: #a9b5bc !important;
  }
}

#convoLastMsg {
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#chatBlock {
  max-height: 100%;

  #chatInfo {
    min-height: 60px;
    background-color: black;
    padding: 10px;
  }

  #chatBodyContainer {
    height: calc(100% - 130px);
    overflow: auto;
  }

  #chatBody {
    background-color: #f4f4f7;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 10px;
    overflow: auto;

    .massagesList {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;

      .messageContent {
        max-width: 80%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        p {
          background-color: white;
          padding: 10px 20px;
          border-radius: 0px 10px 10px 10px;
          max-width: max-content;
        }
      }

      &.owner {
        flex-direction: row-reverse;

        .messageContent {
          align-items: flex-end;
          p {
            background-color: black;
            color: white;
            border-radius: 10px 0px 10px 10px;
          }
        }
      }
    }
  }

  #chatInput {
    padding: 10px;
    margin: auto;
  }

  p {
    margin: 10px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  }
}
</style>
