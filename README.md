# backend
Backend for spellcards

Lambda backend to serve spaced repition logic to spellcard game. Authentication using Cognito and uses api gateway. Connects to a MySQL RDS instance.

---

## Endpoints

### getUserAssignments (/GET)

Takes: 

- Authorization token in header.

Returns:

- Array of active assignment ids it's name and due date.

```json
{
    assignments: [
        {
            assignment_id: 1,
            assignment_name: "Colours",
            due_date: 1625626376
        },        
        {
            assignment_id: 2,
            assignment_name: "Numbers 1",
            due_date: 1625626376
        },
    ]
}
```

### getAssignmentWords (/GET)

 Takes:

- Authorization token in header.
- assignment_id in params.

Returns:

- Array of words and its meta data.

```json
{
    words: [
        {
            word_id: 1,
            word_strength: 2,
            last_seen: 1625626376,
            english_word: "Hello",
            maori_word: "Kia Ora"
        },
        {
            word_id: 2,
            word_strength: 3,
            last_seen: 1625626376,
            english_word: "Good Bye",
            maori_word: "Kia Ora"
        }
    ]
}
```

### updateUserMetaData (/POST)

Takes:

- Authorization token in header.
- Array of words to be updated in body with:
  - word_id (words id)
  - updated word_strength (new level)
  - last_seen (current date)

```json
{
    student_id: 1,
    meta_data: [
        {
            word_id: 1,
            word_strength: 4,
            last_seen: 1625626376
        },
        {
            word_id: 2,
            word_strength: 1,
            last_seen: 1625626376
        },
    ]
}
```

Returns:

- on success: 200 status code
- on failure: 400 status code

