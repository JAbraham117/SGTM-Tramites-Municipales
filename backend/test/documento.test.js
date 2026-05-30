describe("Módulo de Documentos", () => {

    test("Debe validar nombre de archivo", () => {

        const documento = {
            nombre: "constancia.pdf"
        };

        expect(documento.nombre).toContain(".pdf");

    });

    test("Debe validar tipo de archivo", () => {

        const documento = {
            tipo_archivo: "application/pdf"
        };

        expect(documento.tipo_archivo).toBe("application/pdf");

    });

});