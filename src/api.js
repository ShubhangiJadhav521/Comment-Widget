export const getComments = async () => {
  const comment= JSON.parse(localStorage.getItem('comments'))
  const Likes =[];
   comment && comment.map((e,id)=>{
      Likes.push(e.likes)
  })
  
  return [
    {
      id: "1",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2023-10-19T23:00:33.010+02:00",
      imageUrl: "https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.jpg?s=612x612&w=0&k=20&c=uP9rKidKETywVil0dbvg_vAKyv2wjXMwWJDNPHzc_Ug=",
      likes:Likes[0] >0?Likes[0]:0,
    },
    {
      id: "2",
      body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: "2023-10-16T23:00:33.010+02:00",
      imageUrl: "https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw",
      likes:Likes[1] >0?Likes[1]:0,
    },

    {
      id: "3",
      body: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
      username: "Harshita",
      userId: "2",
      parentId: "2",
      createdAt: "2023-10-16T23:00:33.010+02:00",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl7xYqho8VFxvJSR9heh8UTerI6FW4KDbxA&usqp=CAU",
      likes: Likes[2] >0?Likes[2]:0,
    },
  ];
};

export const createComment = async (text, parentId = null, imageUrl, likes) => {

  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "You",
    createdAt: new Date().toISOString(),
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtEbTLfMii3TQW5ambR0PD6FlRMPcUFzDy_g&usqp=CAU',
    likes: 0,
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
