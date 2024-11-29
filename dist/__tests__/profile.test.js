"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileModel_1 = require("../models/profileModel");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Testando o CRUD de Profile", () => {
    let profileId;
    beforeAll(async () => {
        const novoProfile = {
            firstname: "Bianca",
            lastname: "Silva",
            profession: "Programador",
            type: "Pleno",
            balance: 6000.0,
        };
        const createdProfile = await profileModel_1.Profile.create(novoProfile);
        profileId = createdProfile.id;
    });
    afterAll(async () => {
        await profileModel_1.Profile.destroy({ where: { id: profileId } });
    });
    it("Esse Teste deve criar um novo perfil", async () => {
        const novoProfile = {
            firstname: "Bianca",
            lastname: "Silva",
            profession: "Programador",
            type: "Pleno",
            balance: 6000.0,
        };
        const response = await (0, supertest_1.default)(app_1.default).post("/api/profiles").send(novoProfile);
        expect(response.status).toBe(201);
        expect(response.body.firstname).toBe(novoProfile.firstname);
        expect(response.body.lastname).toBe(novoProfile.lastname);
        expect(response.body.profession).toBe(novoProfile.profession);
        expect(response.body.balance).toBe(novoProfile.balance);
    });
    it("Esse Teste retornar um perfil existente", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get(`/api/profiles/${profileId}`);
        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe("Bianca");
        expect(response.body.lastname).toBe("Silva");
        expect(response.body.profession).toBe("Programador");
        expect(response.body.balance).toBe(6000.0);
    });
    it("Esse Teste atualizar um perfil", async () => {
        const updatedData = {
            firstname: "Lucas",
            lastname: "Pereira",
            profession: "Desenvolvedor",
            type: "Pleno",
            balance: 7000.0,
        };
        const response = await (0, supertest_1.default)(app_1.default).put(`/api/profiles/${profileId}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe(updatedData.firstname);
        expect(response.body.lastname).toBe(updatedData.lastname);
        expect(response.body.profession).toBe(updatedData.profession);
        expect(response.body.balance).toBe(updatedData.balance);
    });
    it("Esse Teste deve excluir um perfil", async () => {
        const response = await (0, supertest_1.default)(app_1.default).delete(`/api/profiles/${profileId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Profile deleted successfully");
        const deletedProfile = await profileModel_1.Profile.findByPk(profileId);
        expect(deletedProfile).toBeNull();
    });
    it("O Teste deve retornar erro ao tentar excluir um perfil inexistente", async () => {
        const response = await (0, supertest_1.default)(app_1.default).delete("/api/profiles/10");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Profile not found");
    });
});
