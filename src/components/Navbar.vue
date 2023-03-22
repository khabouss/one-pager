<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <strong>My Website</strong>
            </a>

            <button class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button is-primary">
                            <strong>Export</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
  
<style>
.navbar {
    background-color: #fff;
    border-bottom: 1px solid #dbdbdb;
    box-shadow: 0px 1px 2px rgba(10, 10, 10, 0.1);
    padding: 0.75rem 1.5rem;
}

.navbar-brand {
    display: flex;
    align-items: center;
}

.navbar-item {
    padding: 0;
}

.buttons {
    display: flex;
    align-items: center;
}

.button.is-primary {
    background-color: #4a4a4a;
    border-color: #4a4a4a;
    color: #fff;
}

.button.is-primary:hover {
    background-color: #363636;
    border-color: #363636;
    color: #fff;
}
</style>
  
  
<script>
export default {
    methods: {
        exportData() {

        }
    }
}
</script>
  