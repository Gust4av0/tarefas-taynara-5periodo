const request = require("supertest");

const BASE_URL = "https://jsonplaceholder.typicode.com";

describe("JSONPlaceholder API Tests", () => {
  // Deve retornar um post existente com dados válidos
  test("GET /posts/1", async () => {
    // Arrange
    const endpoint = "/posts/1";

    // Act
    const response = await request(BASE_URL).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(typeof response.body.title).toBe("string");
    expect(response.body.title.trim().length).toBeGreaterThan(0);
  });

  // Deve retornar erro para recurso inexistente
  test("GET /posts/9999", async () => {
    // Arrange
    const endpoint = "/posts/9999";

    // Act
    const response = await request(BASE_URL).get(endpoint);

    // Assert
    expect(response.status).toBe(404);

    // A API retorna status 404 com body vazio
  });

  // Deve criar um novo post com sucesso
  test("POST /posts", async () => {
    // Arrange
    const payload = {
      title: "Teste",
      body: "Conteúdo teste",
      userId: 1,
    };

    // Act
    const response = await request(BASE_URL)
      .post("/posts")
      .send(payload)
      .set("Content-Type", "application/json");

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  // Deve validar o schema básico do usuário
  test("GET /users/1 schema validation", async () => {
    // Arrange
    const endpoint = "/users/1";

    // Act
    const response = await request(BASE_URL).get(endpoint);

    // Assert
    expect(response.status).toBe(200);

    expect(typeof response.body.id).toBe("number");
    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.email).toBe("string");
    expect(typeof response.body.username).toBe("string");

    // Validação de formato de email
    expect(response.body.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
