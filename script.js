const notesCoontainer = document.getElementById("app");
const addNoteButton = notesCoontainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesCoontainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// local storage'ta saklanan notlari getirecek
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// notlari local storage'a saklayacak
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// yeni not elementi olusturacak olan fonksiyon. burda 2 tane parametre var. id: elementin id'sini belirleyecek. content: olusturacak elementin icerigini belirleyecek
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Bos note";

  //   yeni olusturulan ve duzenlenen notun duzenlenmesini saglar
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Do you want to delete this note");
    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesCoontainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);

  console.log("Updating Note...");
  console.log(id, newContent);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesCoontainer.removeChild(element);

  console.log("Deleting Note...");
  console.log(id);
}
