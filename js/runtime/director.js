export class Director {
    constructor() {
        this.currentScene = 'menu';
    }

    toMenu() {
        this.currentScene = 'menu';
    }

    toGame() {
        this.currentScene = 'game';
    }

    toLeaderboard() {
        this.currentScene = 'leaderboard';
    }
}
