const db = {
  screams: [
    {
      screamId: 'XJki6wK5XcGpnzABKMHS',
      body: 'Why did the M&M go to school? It wanted to be a Smartie.',
      likeCount: 1,
      commentCount: 1,
      createdAt: '2019-09-23T18:25:06.105Z',
      user: {
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image.png}?alt=media',
        firstname: 'Jane',
        username: 'jane_doe',
      },
    },
  ],
  users: [
    {
      firstname: 'Jane',
      lastname: 'Doe',
      username: 'jane_doe',
      email: 'jane.doe@email.com',
      birthdate: '1992-01-30',
      location: 'Stockholm, Sweden',
      userId: 'z13NSegbLhQ4WyofzqCb46soqgj2',
      bio: 'Nam rick grimes malum cerebro.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image.png}?alt=media',
      createdAt: '2019-09-17T08:42:41.187Z',
    },
  ],
  comments: [
    {
      screamId: 'wgNarnumWwwggTyOMKtA',
      commentId: 'jzNnizolstbgzfoZ4TK3',
      body: 'wow! that is so funny 🤣',
      createdAt: '2019-09-14T11:11:58.903Z',
      replyCount: 1,
      user: {
        username: 'jane_doe',
        firstname: 'Jane',
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
    },
  ],
  replies: [
    {
      screamId: 'wgNarnumWwwggTyOMKtA',
      commentId: 'jzNnizolstbgzfoZ4TK3',
      replyId: 'yLpHthk2YYLYfcv87yWH',
      body: 'lol! very funny',
      createdAt: '2019-09-14T15:11:58.903Z',
      user: {
        username: 'alen_adam',
        firstname: 'Alen',
        lastname: 'Adam',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
    },
  ],
  likes: [
    {
      likeId: 'b7bsy0aR6WtDBV6BHaaK',
      screamId: 'wgNarnumWwwggTyOMKtA',
      createdAt: '2019-09-18T07:49:10.204Z',
      user: {
        username: 'alen_adam',
        firstname: 'Alen',
        lastname: 'Adam',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
    },
  ],
  notifications: [
    {
      type: 'like', // Other types = 'comment' and 'reply'
      read: false,
      createdAt: '2019-09-24T07:49:15.120Z',
      recipients: 'jane_doe',
      sender: {
        username: 'jane_doe',
        firstname: 'Jane',
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
      screamId: 'XJki6wK5XcGpnzABKMHS',
      notificationId: 'like_D7rJ0dZh8Vmpm1KGDmPi_jane_doe', // notifTyp_notifId_recipientUserName
    },
  ],
};

/*User own data */
//TODO: store this data in the Redux store
const getCurrentUserData = {
  credentials: {
    firstname: 'Jane',
    lastname: 'Doe',
    username: 'jane_doe',
    email: 'jane.doe@email.com',
    birthdate: '1992-01-30',
    location: 'Stockholm, Sweden',
    userId: 'z13NSegbLhQ4WyofzqCb46soqgj2',
    bio: 'Nam rick grimes malum cerebro.',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image.png}?alt=media',
    createdAt: '2019-09-17T08:42:41.187Z',
  },
  // All screams user created
  screams: [
    {
      screamId: 'XJki6wK5XcGpnzABKMHS',
      body: 'Why did the M&M go to school? It wanted to be a Smartie.',
      likeCount: 1,
      commentCount: 1,
      createdAt: '2019-09-23T18:25:06.105Z',
      user: {
        username: 'jane_doe',
        firstname: 'Jane',
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image.png}?alt=media',
      },
    },
  ],
  // All likes user made
  likes: [
    {
      likeId: 'b7bsy0aR6WtDBV6BHaaK',
      screamId: 'XJki6wK5XcGpnzABKMHS',
      createdAt: '2019-09-24T07:49:10.204Z',
      user: {
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
        firstname: 'Jane',
        username: 'jane_doe',
      },
    },
  ],
  // All Notifications user received
  notifications: [
    {
      type: 'like',
      read: false,
      createdAt: '2019-09-24T07:49:15.120Z',
      recipients: 'jane_doe',
      sender: {
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
        firstname: 'Jane',
        username: 'jane_doe',
      },
      screamId: 'XJki6wK5XcGpnzABKMHS',
      notificationId: 'like_D7rJ0dZh8Vmpm1KGDmPi_jane_doe', // notifTyp_notifId_recipientUserName
    },

    {
      type: 'comment',
      read: false,
      recipients: 'jane_doe',
      createdAt: '2019-09-23T18:26:20.178Z',
      sender: {
        username: 'alen_adam',
        firstname: 'Alen',
        lastname: 'Adam',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
      screamId: 'XJki6wK5XcGpnzABKMHS',
      commentId: 'jzNnizolstbgzfoZ4TK3',
      notificationId: 'comment_D7rJ0dZh8Vmpm1KGDmPi_jane_doe', // notifTyp_notifId_recipientUserName
    },
    {
      type: 'reply',
      read: false,
      recipients: 'jane_doe',
      createdAt: '2019-09-23T18:28:47.068Z',
      sender: {
        username: 'john_doe',
        firstname: 'John',
        lastname: 'Doe',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/{storageBucket}/o/{image-name.jpg}?alt=media',
      },
      screamId: 'XJki6wK5XcGpnzABKMHS',
      commentId: 'jzNnizolstbgzfoZ4TK3',
      replyId: 'yLpHthk2YYLYfcv87yWH',
      notificationId: 'reply_D7rJ0dZh8Vmpm1KGDmPi_jane_doe', // notifTyp_notifId_recipientUserName
    },
  ],
};
