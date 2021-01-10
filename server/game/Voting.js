class Voting {
  constructor(votesRequired) {
    this.votesRequired = votesRequired;
    this.votes = [];
  }
  vote(vote) {
    this.votes.push(vote);
  }
  hasEverybodyVoted() {
    return this.votes.length === this.votesRequired;
  }
  checkIfValid() {
    if (this.votes.every(el => el === "yes")) {
      return true;
    }
  }
}

module.exports = Voting;
