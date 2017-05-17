export default function(users) {
    let usersOnline = users.filter(u => u.status === 'on')
    let usersOffline = users.filter(u => u.status === 'off')
    usersOnline.sort((u1, u2) => u1.username > u2.username)
    usersOffline.sort((u1, u2) => u1.username > u2.username)
    return [...usersOnline, ...usersOffline]
}