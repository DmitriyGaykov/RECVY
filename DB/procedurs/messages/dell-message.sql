create or replace procedure dellMessage(id varchar(256))
language plpgsql as $$
begin
    delete from messages
    where
        messageid = $1;
end;
$$;

select * from sendmessage('YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI', 'Hello mir', 'text');
select * from messages;
call dellMessage('a2BlU5wSJSB4KyZ1q38k19Dzth9IFjj4xMima6T9WmvFRIn9l094ErC0MU0qS163Q1Y5EWmFUsEjzUqE0Jm9i3Z844iykmY77qKLIM1sCRhZxDweLi6D3xrDXiOT38mpdzeGtPiZnD4o0Sr3RnuL9xqw7rzZQ1J3BtL9o1N91DO4rqe1DTi9Rau1P8XCY7rq3ZrM3y111odDlBhevTZp25P4yoF0iR64wvTR5Ek2lG8Z81F1XYK25537FyN1ASZJ');