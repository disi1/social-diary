import { Contact } from "../../types/contact";
import { ContactItem } from "./ContactItem";
import {Category, useCategory} from "../../lib/category";

const dummyContacts = [
  {
    id: 4,
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "Friend",
    category: "Friends",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: 3,
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "Friend",
    category: "Friends",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: 2,
    name: "Ana Niculescu",
    relationship: "Friend",
    location: "",
    category: "Family",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
  {
    id: 1,
    name: "Ana Niculescu",
    relationship: "Colleague",
    location: "",
    category: "WorkBuddies",
    priority: "medium",
    lastEntry: "23 August",
  } as Contact,
];

interface ContactListProps {
  categories: Category[] | undefined;
}

export const ContactList: React.FC<ContactListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {categories?.map((category) => (
        <div className="grid grid-cols-1 gap-2 p-5" key={category.id}>
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
