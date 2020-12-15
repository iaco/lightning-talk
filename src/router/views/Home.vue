<template>
  <div class="d-flex flex-column p-4 h-100">
    <p>Welcome <strong>{{ user ? user.email : '' }}</strong> to our lightning talk</p>
    <b-input-group prepend="Add a note" class="m-3 w-50">
      <b-form-input v-model="newNote"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="addNote()">Add</b-button>
      </b-input-group-append>
    </b-input-group>
    <p v-if="this.notes" v-cloak>Here are the notes we have recorded from you!</p>
    <ul>
      <li v-for="note in notes" :key="note.id">
        <strong>{{ new Date(note.date).toLocaleString("en-US", { timeZone: 'EST' }) }}</strong> - {{note.text}}
        <b-button pill size="sm" class="ml-2" variant="danger" @click="deleteNote(note.id)">Delete</b-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { auth, db } from '@/utils/firebase';

  export default {
      data() {
          return {
            user: auth.currentUser,
            newNote: "",
            notes: {}
          };
      },
      mounted() {
        if (this.user) { this.getNotes() }
      },
      methods: {
        addNote() {
          const notesRef = db.ref('notes/' + this.user.uid);
          let newNote = notesRef.push();
          newNote.set({
            id: newNote.key,
            date: Date.now(),
            text: this.newNote
          }).then(() => {
            this.getNotes();
            this.newNote = "";
          })
        },
        deleteNote(noteId) {
          db.ref('notes/' + this.user.uid + '/' + noteId).remove().then( () => {
            this.getNotes();
          });
        },
        getNotes() {
          db.ref('notes/' + this.user.uid).once('value').then((snapshot) => {
            this.notes = snapshot.val()
          });
        }
      }
  }
</script>