create or replace function sendMessage(_from varchar(50), _to varchar(50), msg varchar(3000), type varchar(20))
returns typemessage as $$
declare
    _id varchar(256) := generateid(256);
    _msg typemessage;
    _isChecked boolean = checksendmessagedto($1, $2, $3, $4);
begin
    insert into
        messages(messageid, iduserfrom, iduserto, message, messagetype)
    values
        (_id, $1, $2, $3, $4)
    returning
        messageid, iduserfrom, iduserto, message, messagetype, isedited, sentdate into _msg;

    return _msg;

    exception
        when others then
            raise exception '%', sqlerrm;
end;
$$ language plpgsql;

