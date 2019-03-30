import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios
        .post("/api/users/login", { credentials })
        .then(res => res.data.user),
    signup: addUser =>
      axios
        .post("/api/users/signup", { addUser })
        .then(res => res.data.user),
    delete: () =>
      axios
        .delete("/api/profiles/")
        .then(res => res.data)
  },
  profile: {
    getProfiles: () =>
      axios
        .get("/api/profiles/all")
        .then(res => res.data),
    getProfile: () =>
      axios
        .get("/api/profiles")
        .then(res => res.data),
    createProfile: newProfile =>
      axios
        .post("/api/profiles", {newProfile})
        .then(res => res.data),
    addExperience: newExperience =>
      axios
        .post("/api/profiles/experience", {newExperience})
        .then(res => res.data),
    addEducation: newEducation =>
      axios
        .post("/api/profiles/education", {newEducation})
        .then(res => res.data),
    deleteExperience: id =>
      axios
        .delete(`/api/profiles/experience/${id}`)
        .then(res => res.data),
    deleteEducation: id =>
      axios
        .delete(`/api/profiles/education/${id}`)
        .then(res => res.data),
    getProfileByHandle: handle =>
      axios
        .get(`/api/profiles/handle/${handle}`)
        .then(res => res.data)
  },
  post: {
    createPost: addPost =>
      axios
        .post("/api/posts", {addPost})
        .then(res => res.data),
    getPosts: () =>
      axios
        .get("/api/posts/all")
        .then(res => res.data),
    likePost: id =>
      axios
        .post(`/api/posts/like/${id}`)
  }
}
