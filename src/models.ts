import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  
  loadContacts() {
    return jsonfile.readFile(__dirname + "/../src/contacts.json").then((json) => {
      this.data = json;
    });
  
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  async save() {
    // usar la version Async (writeFIle)
    await jsonfile.writeFile(__dirname + "/../src/contacts.json", this.data);
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };
 