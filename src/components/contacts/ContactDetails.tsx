import { Contact } from "../../lib/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Priority } from "../../lib/priority";
import { Category } from "../../lib/category";
import { Log } from "../../lib/log";
import { getNoOfHoursSinceDate } from "../../lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ROUTE_HOME } from "../../config";

interface ContactDetailsProps {
  contact: Contact;
  priority: Priority | undefined;
  category: Category | undefined;
  logs: Log[] | undefined;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  category,
  priority,
  logs,
}) => {
  const noOfHoursSinceLastLogEntry =
    logs && logs.length > 0
      ? getNoOfHoursSinceDate(new Date(logs[logs.length - 1].timestamp))
      : null;

  const [selectedLog, setSelectedLog] = useState<Log | null>(
    logs ? logs[0] : null
  );

  return (
    <div className="h-full p-5 dark:bg-darkblue text-base flex justify-center text-gray-600 dark:text-gray-200 overflow-scroll">
      <div className="p-5 flex grow max-w-screen-xl flex-col gap-5">
        <header className="flex flex-col sm:flex-row bg-white dark:bg-slate-900 gap-5 p-5 justify-between items-center">
          <div className="flex lg:flex-row flex-col w-full md:w-auto lg:items-center lg:flex-initial gap-5">
            <div className="avatar self-center sm:self-start">
              <span className="flex justify-center items-center rounded-btn w-24 h-24">
                <FontAwesomeIcon
                  className="text-gray-200 dark:text-gray-200 fa-5x"
                  icon={faUser}
                />
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="flex gap-2">
                <p className="text-slate-500 dark:text-slate-400">Name:</p>
                <p className="font-bold">{contact.name}</p>
              </h1>
              <div className="flex gap-2">
                <p className="text-slate-500 dark:text-slate-400">Category:</p>
                <p className="font-bold">{category ? category?.name : "-"}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-slate-500 dark:text-slate-400">
                  Relationship:
                </p>
                <p className="font-bold">{contact.relationship}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto md:items-center md:flex-initial">
            <div className="flex gap-2">
              <p className="text-slate-500 dark-text-slate-400">Priority:</p>
              <p className="font-bold">{priority ? priority.name : "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-slate-500 dark-text-slate-400">Last entry:</p>
              <p className="font-bold">
                {logs && logs.length > 0
                  ? new Date(logs[0].timestamp).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Link href={`${ROUTE_HOME}/${contact.id}/newLog`}>
              <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-600">
                Got in touch?
              </button>
            </Link>
            <Link href={`${ROUTE_HOME}/${contact.id}/edit`}>
              <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600">
                Edit
              </button>
            </Link>
            <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600">
              Remove
            </button>
          </div>
        </header>
        {logs && logs.length > 0 && (
          <main className="flex flex-col items-center sm:items-initial sm:flex-row bg-white dark:bg-slate-900 gap-5 p-5">
            <ul className="flex flex-col gap-3 text-slate-500 dark-text-slate-400">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex w-max"
                  onClick={() => {
                    setSelectedLog(log);
                  }}
                >
                  <div
                    {...(selectedLog?.id === log.id
                      ? {
                          className:
                            "p-2 cursor-pointer font-bold dark:hover:text-slate-200 hover:text-slate-800 dark:text-slate-200 text-slate-600",
                        }
                      : {
                          className:
                            "p-2 cursor-pointer dark:hover:text-slate-200 hover:text-slate-800",
                        })}
                  >
                    <li className="inline pr-2">
                      {new Date(log.timestamp).toLocaleString()}
                    </li>
                    {selectedLog?.id === log.id && (
                      <FontAwesomeIcon
                        className="sm:rotate-0 rotate-90"
                        icon={faChevronRight}
                      />
                    )}
                  </div>
                </div>
              ))}
            </ul>
            <section className="card grow self-stretch rounded-lg p-5 bg-gray-100 dark:bg-gray-800">
              {selectedLog && (
                <h2 className="text-center font-bold mb-8">
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </h2>
              )}
              {selectedLog && <p>{selectedLog.note}</p>}
            </section>
          </main>
        )}
      </div>
    </div>
  );
};
