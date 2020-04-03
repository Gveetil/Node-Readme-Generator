const axios = require("axios");

/** Token used to access the GitHub API */
const githubToken = "ad9876e2d73619a0e98cc2d73aa701f63188151b";

/** This class represents a Git User */
class GitUser {
  /** Creates an instance of a Git User
   * @constructor
   * @param {String} name the name of the user 
   * @param {String} email the user email address
   * @param {String} imageUrl the user image url
   * @param {Array<GitUserRepo>} repositories list of user's git repositories
   */
  constructor(name, email, imageUrl, repositories) {
    if (name == null || name.trim() == "")
      throw Error("Git User name cannot be empty.");
    this.name = name;
    this.email = (email == null) ? "" : email;
    this.imageUrl = (imageUrl == null) ? "" : imageUrl;
    this.repositories = (repositories == null) ? [] : repositories;
  }
}

/** This class represents a Git User Repository*/
class GitUserRepo {
  /** Creates an instance of a Git User Repository
   * @constructor
   * @param {String} name the Repository name
   * @param {String} description the Repository description
   * @param {String} homepage the Repository homepage url
   */
  constructor(name, description, homepage) {
    this.name = (name == null) ? "" : name;
    this.description = (description == null) ? "" : description;
    this.homepage = (homepage == null) ? "" : homepage;
  }
}

/**
 * Fetches the GitHub details for a given user 
 * @param {String} gitUsername the name of the github user
 * @returns {GitUser} a GitUser object 
 */
async function getUser(gitUsername) {
  try {
    const userUrl = `https://api.github.com/users/${gitUsername}?access_token=${githubToken}`;
    const response = await axios.get(userUrl);
    // If user data has not been retrieved successfully, return null
    if (response == undefined || !("data" in response)
      || !("repos_url" in response.data) || response.data.repos_url == null)
      return null;
    const repositories = await getRepositories(response.data.repos_url);
    return new GitUser(gitUsername, response.data.email, response.data.avatar_url, repositories);
  }
  catch (err) {
    //Error fetching user details - log and return null
    console.log("Could not fetch user details from GitHub.")
    return null;
  }
}

/**
 * Fetches the GitHub repository details from a user's repository url
 * @param {String} reposUrl the user's repository url
 * @returns {Array} an array of the user's repositories
 */
async function getRepositories(reposUrl) {
  try {
    const queryUrl = `${reposUrl}?access_token=${githubToken}`;
    const response = await axios.get(queryUrl);

    // If repository data has not been retrieved successfully, return
    if (response == undefined || !("data" in response) ||
      response.data == undefined || response.data.length <= 0)
      return null;

    let repositories = [];
    for (const repo of response.data) {
      repositories.push(new GitUserRepo(repo.name, repo.description, repo.homepage));
    }
    return repositories;
  }
  catch{
    //Error fetching repository details - log and return 
    console.log("Could not fetch user repository details from GitHub.")
    return null;
  }
}

module.exports = { getUser: getUser };