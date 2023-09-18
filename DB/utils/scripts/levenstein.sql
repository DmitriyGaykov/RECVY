CREATE OR REPLACE FUNCTION levenshtein_distance(text1 text, text2 text) RETURNS integer AS $$
DECLARE
    m integer;
    n integer;
    matrix integer[][];
    i integer;
    j integer;
    cost integer;
BEGIN
    m := length(text1);
    n := length(text2);

    -- Инициализация матрицы
    FOR i IN 0..m LOOP
        matrix[i][0] := i;
    END LOOP;
    FOR j IN 0..n LOOP
        matrix[0][j] := j;
    END LOOP;

    -- Заполнение матрицы
    FOR i IN 1..m LOOP
        FOR j IN 1..n LOOP
            IF substring(text1, i, 1) = substring(text2, j, 1) THEN
                cost := 0;
            ELSE
                cost := 1;
            END IF;

            matrix[i][j] := least(
                matrix[i-1][j] + 1,
                matrix[i][j-1] + 1,
                matrix[i-1][j-1] + cost
            );
        END LOOP;
    END LOOP;

    -- Возвращаем расстояние Левенштейна
    RETURN matrix[m][n];
END;
$$ LANGUAGE plpgsql;