import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Partial<Contact>; 
}

class ContactsController {
  contacts: ContactsCollection;
  promesa : Promise<any>;

  constructor() {
    this.contacts = new ContactsCollection();
    const promesa = this.contacts.loadContacts();
     this.promesa = promesa;
  }
    
  async processOptions(options: ContactsControllerOptions) {
    let resultado;
    if (options.action === "get" && options.params?.id !== undefined) {
      resultado = this.contacts.getOneById(options.params.id);
    } else if (options.action === "get") {
      resultado = this.contacts.getAll();
    } else if (options.action === "save" && options.params) {
      this.contacts.addOne(options.params as Contact); // asumiendo que aquí tienes un Contact válido
      await this.contacts.save();
    }
    return resultado;
  }
  
}


export { ContactsController };
