export default function(users, newMessages) {
    let usersOnline = users.filter(u => u.status === 'on')
    let usersOffline = users.filter(u => u.status === 'off')
    usersOnline.sort((u1, u2) => u1.username > u2.username)
    usersOffline.sort((u1, u2) => u1.username > u2.username)

    let userSorted = [...users].sort((u1, u2) => {
        if (u1._id in newMessages && !(u2._id in newMessages)) {
            return -1
        }
        if (!(u1._id in newMessages) && u2._id in newMessages) {
            return 1
        }
        if (u1._id in newMessages && u2._id in newMessages) {
            return newMessages[u1._id] < newMessages[u2._id]
        }
        if (!(u1._id in newMessages) && !(u2._id in newMessages)) {
            if (u1.status === 'on' && u2.status === 'off') {
                return -1
            }
            if (u1.status === 'off' && u2.status === 'on'){
                return 1
            }
        }
    })
    return userSorted
}