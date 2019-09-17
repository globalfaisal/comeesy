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
    /* TODO: hold this user data in the Redux store */
    {
      credentials: {
        userId: 'u2G37gulZ4YUXIltiBQsLUQzGUt2',
        username: 'user1',
        email: 'userone@email.com',
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
          username: 'username',
          jokeId: 'wgNarnumWwwggTyOMKtA',
        },
      ],
    },
  ],
};
