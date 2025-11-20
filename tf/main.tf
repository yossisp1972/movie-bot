terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

data "terraform_remote_state" "infra" {
  backend = "s3"
  config = {
    bucket = "movie-bot-tfstate"           # Your S3 bucket name
    key    = "global/s3/terraform.tfstate" # Path to your infra state file
    region = "us-east-1"
  }
}

output "cluster_name" {
  value = data.terraform_remote_state.infra.outputs.cluster_name
}