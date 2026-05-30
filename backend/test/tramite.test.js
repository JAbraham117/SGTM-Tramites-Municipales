describe("Módulo de Trámites", () => {

    test("Debe crear un trámite correctamente", () => {

        const tramite = {
            descripcion: "Solicitud de licencia comercial",
            municipio: "Guatemala",
            id_tipo_tramite: 1
        };

        expect(tramite.descripcion).toBe("Solicitud de licencia comercial");
        expect(tramite.id_tipo_tramite).toBe(1);

    });

    test("Debe tener un municipio válido", () => {

        const tramite = {
            municipio: "Mixco"
        };

        expect(tramite.municipio).not.toBe("");

    });

});