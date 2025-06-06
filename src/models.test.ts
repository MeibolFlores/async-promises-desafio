import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  return model.loadContacts().then(() => {
    t.deepEqual(contactsObject, model.getAll());
  });
  });

  // si load() es async, este test tiene que cambiar a:
  // return model.load().then(() => {
  //   t.deepEqual(contactsObject, model.getAll());
  // });

  // esto espera a que la promesa se resuelva y corre el test


test.serial("Testeo el addOne del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  t.deepEqual(model.getAll(), [mockContact]);
});

test.serial("Testeo el save del modelo", (t) => {
  const model = new ContactsCollection();
  // acá también habría que modificar el test
  // para que contemple el uso de promesas
  return model.loadContacts().then(() => {
    const mockContact = {
      id: 30,
      name: "Marce",
    };
    model.addOne(mockContact);
  
  return model.save().then(() => {
    const fileContent = jsonfile.readFileSync(__dirname + "/../src/contacts.json");
    t.deepEqual(fileContent, model.getAll());
  });
});
});

test.serial("Testeo el getOneById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});

test('Cargar contactos desde el archivo', async t => {
  const collection = new ContactsCollection();
  await collection.loadContacts();
  
  t.not(collection.getAll().length, 0); // Verifica que se hayan cargado contactos
});