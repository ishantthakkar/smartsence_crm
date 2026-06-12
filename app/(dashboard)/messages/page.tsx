import { MessagesTable } from '@/components/messages-table';
import { fetchMessages } from '@/lib/messages';

export default async function MessagesPage() {
  const { success, data: messages, message } = await fetchMessages();

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Messages</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          {!success && message ? (
            <div className="alert alert-warning" role="alert">
              {message}. Make sure the backend API is running on port 3000.
            </div>
          ) : null}
          <MessagesTable messages={messages} />
        </div>
      </section>
    </>
  );
}
