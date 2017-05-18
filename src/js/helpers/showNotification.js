export default function () {
    if (Notification.permission === "granted") {
        let notification = new Notification(`New message from ${this.state.users.find(u => u._id === mes.from).username}`)
        setTimeout(function() {
            notification.close()
        }, 3000);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                let notification = new Notification(`New message from ${this.state.users.find(u => u._id === mes.from).username}`)
                setTimeout(function() {
                    notification.close()
                }, 3000);
            }
        })
    }
}