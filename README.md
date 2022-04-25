# Iceburg-Database
 
# Example
```js
import Iceburg from 'iceburg-database';
const cluster = new Iceburg.Iceburg('MyDatabase');
const db = new Iceburg.Database();

db.create('Users');
db.insert({name:"John Doe", age:25}, "Users", "johndoe@email.com");
db.update({name:"John Doe", age:27}, "Users", "johndoe@email.com")

let users = db.getTable("Users");
let user = db.getKey("Users", "johndoe@email.com");
let allData = db.getAll()
(async () => {
    cluster.writeOne(users); // Write to top memory
    cluster.moveOneToTwo(users); // Move top memory value to surface memory; clear top memory value
    await cluster.writeTwo(); // Write surface memory to persistant memory; clear surface memory
    cluster.writeOne(user) // Write to top memory
    await cluster.writeThree(JSON.stringify(allData)); // Write as compressed to persistant memory
})
```
# Documentation
In progress.