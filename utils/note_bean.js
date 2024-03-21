function getNoteBean(note_id,title,content,add_time,update_time,note_code) {
    var note = {
      note_id: note_id,
      title: title,
      content: content,
      add_time: add_time,
      update_time: update_time,
      note_code:note_code,
    }
    return note;
  }
  module.exports = {
    getNoteBean: getNoteBean
  }
  