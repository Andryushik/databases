const tableInvitee = 'Invitee';
const columnsInvitee = [
  { name: 'invitee_no', type: 'SMALLINT NOT NULL, ' },
  { name: 'invitee_name', type: 'VARCHAR(25) NOT NULL, ' },
  { name: 'invited_by', type: 'TINYTEXT, ' },
  { name: 'INDEX', type: 'invitee_name_index (invitee_name), ' },
  { name: 'PRIMARY KEY', type: '(invitee_no)' },
];

const tableRoom = 'Room';
const columnsRoom = [
  { name: 'room_no', type: 'SMALLINT NOT NULL, ' },
  { name: 'room_name', type: 'VARCHAR(25) NOT NULL, ' },
  { name: 'floor_number', type: 'SMALLINT NOT NULL, ' },
  { name: 'PRIMARY KEY', type: '(room_no), ' },
  {
    name: 'FOREIGN KEY',
    type: '(room_name) REFERENCES Invitee (invitee_name)',
  },
];

const tableMeeting = 'Meeting';
const columnsMeeting = [
  { name: 'meeting_no', type: 'INT NOT NULL, ' },
  { name: 'meeting_title', type: 'TINYTEXT NOT NULL, ' },
  { name: 'starting_time', type: 'DATETIME, ' },
  { name: 'ending_time', type: 'DATETIME, ' },
  { name: 'room_no', type: 'SMALLINT NOT NULL, ' },
  { name: 'PRIMARY KEY', type: '(meeting_no), ' },
  { name: 'FOREIGN KEY', type: '(room_no) REFERENCES Room (room_no)' },
];

const valuesInvitee = [
  [1, 'Mark', 'Andrei'],
  [2, 'Benjamin', null],
  [3, 'Lime', 'Dan'],
  [4, 'Rob', 'Andrei'],
  [5, 'Anna', 'Serge'],
];

const valuesRoom = [
  [11, 'Mark', 3],
  [23, 'Benjamin', 4],
  [34, 'Lime', 5],
  [36, 'Rob', 5],
  [50, 'Anna', 8],
];

const valuesMeeting = [
  [1, 'Mark meeting', '2022-12-20 10:00:00', '2022-12-20 11:00:00', 11],
  [2, 'Benjamin appointment', '2022-12-30 20:00:00', '2022-12-30 22:00:00', 23],
  [3, 'Lime business hall', '2022-12-31 20:00:00', '2023-01-01 12:00:00', 34],
  [4, 'Rob interview', '2023-01-01 12:00:00', '2023-01-01 16:00:00', 36],
  [5, 'Anna wedding', '2023-01-02 14:00:00', '2023-01-04 12:00:00', 50],
];

export {
  tableInvitee,
  tableRoom,
  tableMeeting,
  columnsInvitee,
  columnsRoom,
  columnsMeeting,
  valuesInvitee,
  valuesRoom,
  valuesMeeting,
};
