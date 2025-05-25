require(["jquery"], function ($) {
  $(document).ready(function () {
    const pageId = $("body").attr("id");
    console.log("Current page ID:", pageId);

    if (["page-user-edit", "page-user-editadvanced"].includes(pageId)) {
      console.log("Edit page detected, loading modules...");

      // Notificar a Moodle que estamos cargando JS (opcional, puedes omitir si no usas "loader" realmente)
      M.util.js_pending("theme_boost/loader");

      require(["theme_boost/loader"], function () {
        M.util.js_complete("theme_boost/loader");
      });

      // Cargar módulos personalizados
      require(["theme_adaptable/init"], function (module) {
        console.log("init loaded");
        module.init();
      });

      require(["theme_adaptable/validateRegistration"], function (module) {
        console.log("validate loaded");
        module.validate();
      });
    }
  });
});
