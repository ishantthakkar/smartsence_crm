import { formatMessageDate, type MessageRecord } from '@/lib/messages';

interface MessagesTableProps {
  messages: MessageRecord[];
}

export function MessagesTable({ messages }: MessagesTableProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">WeCom Messages</h3>
        <div className="card-tools">
          <span className="badge badge-primary">{messages.length} total</span>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="thead-light">
            <tr>
              <th style={{ width: '80px' }}>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th style={{ width: '100px' }}>Type</th>
              <th>Content</th>
              <th style={{ width: '180px' }}>Received</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5">
                  No messages yet.
                </td>
              </tr>
            ) : (
              messages.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.sender || '-'}</td>
                  <td>{item.receiver || '-'}</td>
                  <td>
                    <span className="badge badge-info">{item.msgType || 'unknown'}</span>
                  </td>
                  <td style={{ maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {item.content || '-'}
                  </td>
                  <td>{formatMessageDate(item.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {messages.length > 0 ? (
        <div className="card-footer text-muted">
          Showing {messages.length} message{messages.length === 1 ? '' : 's'}
        </div>
      ) : null}
    </div>
  );
}
