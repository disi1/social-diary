import { ContactItem } from "./ContactItem";
import { Category } from "../../lib/category";
import { Contact } from "../../lib/contact";
import { Log } from "../../lib/log";
import { Priority } from "../../lib/priority";

interface ContactListProps {
  contacts: Contact[] | undefined;
  categories: Category[] | undefined;
  logs: Log[] | undefined;
  priorities: Priority[] | undefined;
}

export const ContactList: React.FC<ContactListProps> = ({
  categories,
  contacts,
  logs,
  priorities,
}) => {
  return (
    <div className="h-full p-5 dark:bg-darkblue grid gap-5 grid-flow-col auto-cols-[minmax(300px,_1fr)] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] overflow-scroll">
      {categories?.map((category) => (
        <div
          className="grid bg-white dark:bg-slate-900 grid-cols-1 auto-rows-min gap-5 p-5"
          key={category.id}
        >
          <div className="text-gray-900 dark:text-white text-center font-semibold text-xl tracking-tight mb-2">
            {category.name}
          </div>
          {contacts?.map(
            (contact) =>
              contact.category_id === category.id && (
                <ContactItem
                  contact={contact}
                  key={contact.id}
                  logs={logs?.filter((log) => log.contact_id === contact.id)}
                  priority={
                    priorities?.filter(
                      (priority) => priority.id === contact.priority_id
                    )[0]
                  }
                />
              )
          )}
        </div>
      ))}
    </div>
  );
};
