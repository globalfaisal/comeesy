const db = {
  jokes: [
    {
      username: 'username',
      body:
        'Did you hear about the crook who stole a calendar? He got twelve months.',
      createdAt: '2019-09-12T11:59:58.903Z',
      /*optional fields*/
      likeCount: 11,
      commentCount: 7,
    },
  ],
  users: [
    {
      userId: 'u2G37gulZ4YUXIltiBQsLUQzGUt2',
      firstname: 'John',
      lastname: 'Doe',
      username: 'john_doe',
      email: 'johndoe@email.com',
      createdAt: '2019-09-12T11:59:58.903Z',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/image-name.jpg?alt=media',
      /*optional fields*/
      location: 'Stockholm, Sweden',
      birthdate: '1990-12-08',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ],
  comments: [
    {
      jokeId: 'wgNarnumWwwggTyOMKtA',
      body: 'wow! that is so funny 🤣',
      createdAt: '2019-09-14T11:11:58.903Z',
      username: 'jane_doe',
    },
  ],
};

/* Client app Redux Data */
const userOwnData = {
  credentials: {
    userId: 'u2G37gulZ4YUXIltiBQsLUQzGUt2',
    firstname: 'John',
    lastname: 'Doe',
    username: 'john_doe',
    email: 'johndoe@email.com',
    createdAt: '2019-09-12T11:59:58.903Z',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/image-name.jpg?alt=media',
    /*optional fields*/
    location: 'Stockholm, Sweden',
    birthdate: '1990-12-08',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  likes: [
    {
      username: 'john_doe',
      jokeId: 'wgNarnumWwwggTyOMKtA',
    },
  ],
};
