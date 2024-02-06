<script>
    import { settings } from '../stores/settings'
    $: defaultBackgroundImage = $settings.defaultBackgroundImage
</script>

<section class="absolute inset-0 h-full w-full -z-10">
    <img
        src={defaultBackgroundImage}
        alt="wallpaper"
        class="w-full h-full object-cover" />
</section>
