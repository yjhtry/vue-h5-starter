PROJ_NAME = your-project-name

build-qa:
	@pnpm lint
	@pnpm build-qa
	@read -p "是否将打包完成的资源上传至qa环境? (y/n) " yn; \
	case "$$yn" in \
		[yY]* ) echo "Uploading..."; make upload-qa;; \
		[nN]* ) echo "Skipping upload.";; \
		* ) echo "Please answer y or n.";; \
	esac

build-prod:
	@pnpm lint
	@pnpm build-prod
	@read -p "是否将打包完成的资源上传至正式环境? (y/n) " yn; \
	case "$$yn" in \
		[yY]* ) echo "Uploading..."; make upload-prod;; \
		[nN]* ) echo "Skipping upload.";; \
		* ) echo "Please answer y or n.";; \
	esac

upload-qa:
	// todo

upload-prod:
	// todo
