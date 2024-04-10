import io from "socket.io-client";
import { onMounted, ref } from "vue";

const socket = io("ws://localhost:3001");

export function useOnline() {
  const onlineUsers = ref(0);

  const createOrJoinRoom = () => {
    socket.emit("join", {
      roomId: 1,
      name: "小明",
    });
  };

  const getOnlineUser = () => {
    socket.emit("getRoomUsers", {
      roomId: 1,
    });
  };

  const leave = () => {
    socket.emit("leave", {
      roomId: 1,
      name: "小明",
    });
    getOnlineUser();
  };

  onMounted(() => {
    createOrJoinRoom();
    getOnlineUser();
    // socket.on("join", (e) => {
    //   console.log(e);
    // });
    // socket.on("leave", (e) => {
    //   console.log(e);
    // });
    socket.on("getRoomUsers", (e) => {
      onlineUsers.value = e;
    });
  });

  return {
    onlineUsers,
  };
}
