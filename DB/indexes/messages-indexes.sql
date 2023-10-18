create unique index idx_messageid on messages(messageid) tablespace indextablespace;

-- заполнить таблицу messages 1000000 записями
-- напиши цикл

create or replace procedure fill()
as $$
declare
  i int;
  _messageid text;
begin
    i := 1;
    while i <= 100000 loop
        select messageid into _messageid from sendMessage('IMSv8XlkJwtsBVPKpUY18zQ8KT27BGF6kZdm73XJH890hm8sYw', 'IMSv8XlkJwtsBVPKpUY18zQ8KT27BGF6kZdm73XJH890hm8sYw', 'Hello mir ' || cast(i as text), 'text');
        i := i + 1;
    end loop;
end;
$$ language plpgsql;

