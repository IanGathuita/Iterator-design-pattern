//collection item
class Person{
    name:string;
    age:number;
    occupation:string;
    constructor(name:string, age:number, occupation:string){
        this.name = name;
        this.age = age;
        this.occupation = occupation;
    }
}

interface IIterator{
    first():Person;
    next():Person;
    isCompleted():boolean;
}

class ConcreteIterator implements IIterator{

    collection: ConcreteCollection;
    current:number = 0;
    step:number = 1;

    constructor(collection: ConcreteCollection){
        this.collection = collection;
    }

    first(): Person {
        this.current = 0;
        return this.collection.getPerson(this.current);
    }

    next(): Person {

        this.current += this.step;
        if (!this.isCompleted()) {
            return this.collection.getPerson(this.current);
        }
        else {
            return null;
        }
    }

    isCompleted(): boolean{
        return this.current >= this.collection.count();
    };
    
}

interface AbstractCollection {
    createIterator():ConcreteIterator;
}

class ConcreteCollection implements AbstractCollection{
    people:Person[] = [];

    createIterator(): ConcreteIterator {
        return new ConcreteIterator(this);
    }

    count():number{
        return this.people.length;
    }

    addPerson(person:Person):void{
        this.people.push(person);
    }

    getPerson(position:number):Person{
        return this.people[position];
    }
}

//client
let myCollection = new ConcreteCollection();
myCollection.addPerson(new Person('Ian',22,'Dev'));
myCollection.addPerson(new Person('Joy',21,'Dev'));
myCollection.addPerson(new Person('Ellis',36,'Actor'));

let iterator = myCollection.createIterator();
for(let i:Person = iterator.first(); !iterator.isCompleted(); i = iterator.next()){
    console.log(`${i.age} ${i.name} ${i.occupation}`)
}


