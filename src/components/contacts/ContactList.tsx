import { Category, Contact } from "../../types/contact";
import { ContactItem } from "./ContactItem";

const dummyContacts = [
  {
    id: "1",
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "Friend",
    category: "Friends",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: "2",
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "Friend",
    category: "Friends",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: "1",
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "",
    category: "Family",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: "1",
    name: "Ana Niculescu",
    relationship: "Colleague",
    location: "",
    category: "WorkBuddies",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
];

const dummyCategories = [
  {
    id: "1",
    name: "Friends",
  } as Category,
  {
    id: "2",
    name: "Family",
  } as Category,
  {
    id: "3",
    name: "WorkBuddies",
  } as Category,
];

export const ContactList = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {dummyCategories.map((category) => (
        <div className="grid grid-cols-1 gap-2 p-5">
          <div>{category.name}</div>
          {dummyContacts.map(
            (contact) =>
              contact.category === category.name && (
                <ContactItem contact={contact} key={contact.id} />
              )
          )}
        </div>
      ))}
    </div>
  );
};
