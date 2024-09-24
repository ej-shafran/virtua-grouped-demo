import { faker } from "@faker-js/faker/locale/he";
import dayjs from "dayjs";
import { Virtualizer } from "virtua";

const data = faker.helpers.multiple(
  () => ({
    name: faker.commerce.department(),
    people: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        boxes: faker.helpers
          .multiple(() => dayjs(faker.date.anytime()).format("HH:mm:ss"))
          .sort((a, b) => dayjs(a, "HH:mm:ss").diff(dayjs(b, "HH:mm:ss"))),
      }),
      {
        count: {
          min: 15,
          max: 60,
        },
      },
    ),
  }),
  {
    count: {
      min: 5,
      max: 10,
    },
  },
);

function App() {
  return (
    <Virtualizer horizontal count={data.length}>
      {(i) => {
        const sector = data[i];

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid purple",
              height: "100vh",
            }}
          >
            <h2>{sector.name}</h2>

            <Virtualizer horizontal count={sector.people.length}>
              {(j) => {
                console.log(`${i}: ${j} of ${sector.people.length}`);

                const person = sector.people[j];

                return (
                  <div
                    style={{
                      border: "1px solid red",
                      height: "90%",
                    }}
                    key={person.id}
                  >
                    <div>{person.name}</div>
                    <ul>
                      {person.boxes.map((box) => (
                        <li>{box}</li>
                      ))}
                    </ul>
                  </div>
                );
              }}
            </Virtualizer>
          </div>
        );
      }}
    </Virtualizer>
  );
}

export default App;
