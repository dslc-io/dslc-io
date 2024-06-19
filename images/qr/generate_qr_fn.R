generate_qr <- function(page) {
  url <- glue::glue("https://DSLC.io/{page}.html")
  target <- here::here("images", "qr", glue::glue("qr_dslc_{page}.png"))
  qr_plot <- magick::image_graph(width = 1000, height = 1000, res = 96)
  qrcode::qr_code(url, ecl = "H") |>
    plot()
  dev.off()
  magick::image_write(
    qr_plot,
    path = target
  )
}
