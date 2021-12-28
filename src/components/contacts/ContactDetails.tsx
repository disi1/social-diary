import { Contact } from "../../lib/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Priority } from "../../lib/priority";
import { Category } from "../../lib/category";
import { Log } from "../../lib/log";

interface ContactDetailsProps {
  contact: Contact;
  priority: Priority;
  category: Category;
  logs: Log[];
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  category,
  priority,
  logs,
}) => {
  return (
    <div className="flex flex-col p-5">
      <div className="mb-2 flex items-center">
        <div className="text-gray-700 font-bold text-xl mr-2">
          {contact.name}
        </div>
        {<FontAwesomeIcon icon={faCircle} color={logs ? "green" : "gray"} />}
      </div>
      <div className="my-5">
        <button
          type="button"
          className="text-sm bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 px-4 rounded text-center shadow"
        >
          Got in touch?
        </button>
      </div>
      <div>
        <p>{`Category: ${category.name}`}</p>
        <p>{`Relationship: ${contact.relationship}`}</p>
        <p>{`Priority: ${priority.name}`}</p>
        <div>
          Logs:
          {logs && logs.length > 0 ? (
            <div className="flex flex-col">
              {logs.map((log) => (
                <div className="ml-5">{`Log ${log.id}: ${log.note}`}</div>
              ))}
            </div>
          ) : (
            " There are no logs"
          )}
        </div>
      </div>
    </div>
  );
};
