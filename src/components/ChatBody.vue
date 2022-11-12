<template>
  <div class="container-fluid p-5">
    <!-- CHAT CARD -->
    <div class="row justify-content-center">
      <div id="card" class="card m-5 border rounded-4">
        <div class="row" style="height: 100%">
          <!-- CONVO BLOCK -->
          <div id="convoBlock" class="col-3">
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
                <div id="convoLastMsg">
                  <span class="text-dark">Last Message</span>
                </div>
              </div>
            </div>
          </div>

          <!-- CHAT BLOCK -->
          <div id="chatBlock" class="col-9">
            <!-- CHAT HEADER -->
            <div class="row">
              <div id="chatInfo">
                <h4 class="m-2 text-white">{{ chatHeaderName }}</h4>
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
      console.log(this.convos);
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
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  height: 75vh;
  overflow: hidden;
}

#convoBlock {
  height: 100%;
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
  overflow: auto;
}

#convoBody {
  height: 100px;
  padding: 20px;
  text-align: left;
  border-radius: 15px;
  background-color: #f4f4f7;
  cursor: pointer;

  &:hover {
    background-color: #a9b5bc !important;
  }
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
