// for opening and closing the modal in mobile devices
const toggleSideBarButton = document.querySelector(".toggle_side_bar_button button");
const closeSideBarButton = document.querySelector(".closeSideBarButton button");
const messageArea = document.querySelector(".messages");
const sideBar = document.querySelector(".sideBar");

toggleSideBarButton.addEventListener("click", () => {
  sideBar.classList.add("active_side_bar");
  messageArea.style.overflowY = "hidden";
});

closeSideBarButton.addEventListener("click", () => {
  sideBar.classList.remove("active_side_bar");
  messageArea.style.overflowY = "unset";
});

// for opening and closing the modal after clicking no the start new chat button
const modalButton = document.querySelector(".addNewConversation");
const startNewChatModal = document.querySelector(".start_new_chat_modal_content_container");
const closeModalButton = document.querySelector(".close_modal_button");

function openModal() {
  startNewChatModal.style.display = "grid";
}
function closeModal() {
  startNewChatModal.style.display = "none";
}

modalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
