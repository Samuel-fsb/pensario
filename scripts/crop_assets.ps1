Add-Type -AssemblyName System.Drawing

$srcDir = "c:\projects\pensario\docs\design"
$outDir = "c:\projects\pensario\src\frontend\public\assets"
$philoDir = "$outDir\philosophers"

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }
if (!(Test-Path $philoDir)) { New-Item -ItemType Directory -Path $philoDir -Force }

# 1. Bottom landscape silhouette from 04-ativacao.png (Width: 492, Height: 271)
# Y: 185 to 271 (Height: 86)
$bmp04 = [System.Drawing.Bitmap]::FromFile("$srcDir\04-ativacao.png")
$rectBottom = New-Object System.Drawing.Rectangle(0, 180, 492, 91)
$bottomCrop = $bmp04.Clone($rectBottom, $bmp04.PixelFormat)
$bottomCrop.Save("$outDir\bottom-mountains.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bottomCrop.Dispose()
$bmp04.Dispose()
Write-Host "Created bottom-mountains.png"

# 2. Auth landscape from 02-entrar.png (Width: 492, Height: 318)
# Left side has landscape: X: 0 to 210, Y: 28 to 318
$bmp02 = [System.Drawing.Bitmap]::FromFile("$srcDir\02-entrar.png")
$rectAuth = New-Object System.Drawing.Rectangle(0, 28, 210, 290)
$authCrop = $bmp02.Clone($rectAuth, $bmp02.PixelFormat)
$authCrop.Save("$outDir\auth-landscape.png", [System.Drawing.Imaging.ImageFormat]::Png)
$authCrop.Dispose()
$bmp02.Dispose()
Write-Host "Created auth-landscape.png"

# 3. Philosophers from 07-biblioteca.png (Width: 492, Height: 282)
# Cards are:
# Card 1 (Sócrates): X: 10, Y: 119, W: 112, H: 85
# Card 2 (Platão): X: 135, Y: 119, W: 112, H: 85
# Card 3 (Aristóteles): X: 259, Y: 119, W: 112, H: 85
# Card 4 (Nietzsche): X: 382, Y: 119, W: 105, H: 85
$bmp07 = [System.Drawing.Bitmap]::FromFile("$srcDir\07-biblioteca.png")

# Sócrates
$rectSoc = New-Object System.Drawing.Rectangle(15, 120, 105, 80)
$socCrop = $bmp07.Clone($rectSoc, $bmp07.PixelFormat)
$socCrop.Save("$philoDir\socrates.png", [System.Drawing.Imaging.ImageFormat]::Png)
$socCrop.Dispose()

# Platão
$rectPla = New-Object System.Drawing.Rectangle(138, 120, 105, 80)
$plaCrop = $bmp07.Clone($rectPla, $bmp07.PixelFormat)
$plaCrop.Save("$philoDir\platao.png", [System.Drawing.Imaging.ImageFormat]::Png)
$plaCrop.Dispose()

# Aristóteles
$rectAri = New-Object System.Drawing.Rectangle(262, 120, 105, 80)
$ariCrop = $bmp07.Clone($rectAri, $bmp07.PixelFormat)
$ariCrop.Save("$philoDir\aristoteles.png", [System.Drawing.Imaging.ImageFormat]::Png)
$ariCrop.Dispose()

# Nietzsche
$rectNie = New-Object System.Drawing.Rectangle(384, 120, 100, 80)
$nieCrop = $bmp07.Clone($rectNie, $bmp07.PixelFormat)
$nieCrop.Save("$philoDir\nietzsche.png", [System.Drawing.Imaging.ImageFormat]::Png)
$nieCrop.Dispose()

$bmp07.Dispose()
Write-Host "Created philosopher portraits"

# 4. Large Socrates portrait from 08-filosofo.png (Width: 492, Height: 282)
$bmp08 = [System.Drawing.Bitmap]::FromFile("$srcDir\08-filosofo.png")
$rectSocLg = New-Object System.Drawing.Rectangle(5, 75, 175, 205)
$socLgCrop = $bmp08.Clone($rectSocLg, $bmp08.PixelFormat)
$socLgCrop.Save("$philoDir\socrates-large.png", [System.Drawing.Imaging.ImageFormat]::Png)
$socLgCrop.Dispose()
$bmp08.Dispose()
Write-Host "Created socrates-large.png"
